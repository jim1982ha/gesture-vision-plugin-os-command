import type { Response } from 'node-fetch';

import { executeWithRetry, createErrorResult } from '#backend/utils/action-helpers.js';
import { type OsCommandActionInstanceSettings } from './schemas.js';
import type { WebSocketConnectionManager } from '#shared/services/connection-manager.js';

import type { ActionDetails, ActionResult } from '#shared/index.js';
import type { ActionHandler } from '#backend/types/index.js';

export class OsCommandActionHandler implements ActionHandler {
  #connectionManager: WebSocketConnectionManager;

  constructor(connectionManager: WebSocketConnectionManager) {
    this.#connectionManager = connectionManager;
  }

  async execute(
    instanceSettings: OsCommandActionInstanceSettings,
    _actionDetails: ActionDetails
  ): Promise<ActionResult> {
    if (!instanceSettings.osCommand) {
      return createErrorResult('OS Command Action Error: Command not specified.', {
        settings: instanceSettings,
      });
    }

    const targetHost = instanceSettings.companionHost?.trim() || 'localhost';
    const companionUrl = `ws://${targetHost}:9003/ws`;

    const actionFn = async () => {
      const socket = await this.#connectionManager.getConnection(companionUrl);
      
      const commandPayload = {
        command: instanceSettings.osCommand,
        target: instanceSettings.osTarget,
      };
      
      await new Promise<void>((resolve, reject) => {
        const sendTimeout = setTimeout(() => reject(new Error(`Timeout sending command to Companion at ${targetHost}.`)), 2000);
        socket.send(JSON.stringify(commandPayload), (err?: Error) => {
          clearTimeout(sendTimeout);
          if (err) reject(err);
          else resolve();
        });
      });
      
      const mockResponse = { ok: true, status: 200 } as Response;
      return { response: mockResponse, responseBody: instanceSettings };
    };
    
    const isRetryable = (error: unknown): boolean => {
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        return msg.includes('timeout') || msg.includes('refused') || msg.includes('not found') || msg.includes('closed');
      }
      return false;
    };

    return executeWithRetry<OsCommandActionInstanceSettings>({
        actionFn,
        isRetryableError: isRetryable,
        maxRetries: 2,
        initialDelayMs: 1000,
        actionName: `OS Command '${instanceSettings.osCommand}' to ${targetHost}`,
    });
  }
}