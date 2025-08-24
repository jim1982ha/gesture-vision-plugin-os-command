/* FILE: extensions/plugins/os-command/action-handler.os-command.ts */
import WebSocket from 'ws';

import { createErrorResult, createSuccessResult } from '#backend/utils/action-helpers.js';
import { type OsCommandActionInstanceSettings } from './schemas.js';

import type { ActionDetails, ActionResult } from '#shared/types/index.js';
import type { ActionHandler, BackendPluginContext } from '#backend/types/index.js';

export class OsCommandActionHandler implements ActionHandler {
  constructor() {}

  async execute(
    instanceSettings: OsCommandActionInstanceSettings,
    _actionDetails: ActionDetails,
    _pluginGlobalConfig?: unknown,
    context?: BackendPluginContext
  ): Promise<ActionResult> {
    if (!instanceSettings.osCommand) {
      return createErrorResult('OS Command Action Error: Command not specified.', {
        settings: instanceSettings,
      });
    }
    if (!context?.connectToCompanion) {
      return createErrorResult(
        'Core Error: Companion connection utility is not available.',
        { contextAvailable: !!context }
      );
    }

    const targetHost = instanceSettings.companionHost?.trim() || 'localhost';
    let socket: WebSocket | null = null;
    try {
      socket = (await context.connectToCompanion(targetHost)) as WebSocket | null;
      if (!socket) {
        throw new Error('Failed to establish a valid WebSocket connection.');
      }

      const commandPayload = {
        command: instanceSettings.osCommand,
        target: instanceSettings.osTarget,
      };
      await new Promise<void>((resolve, reject) => {
        const sendTimeout = setTimeout(
          () =>
            reject(
              new Error(`Timeout sending command to Companion at ${targetHost}.`)
            ),
          2000
        );
        socket?.send(JSON.stringify(commandPayload), (err) => {
          clearTimeout(sendTimeout);
          if (err) reject(err);
          else resolve();
        });
      });
      return createSuccessResult(
        `OS command '${instanceSettings.osCommand}' sent to ${targetHost}.`,
        instanceSettings
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return createErrorResult(`OS command failed: ${message}`, {
        error,
        host: targetHost,
        settingsUsed: instanceSettings,
      });
    } finally {
      if (socket && socket.readyState === WebSocket.OPEN)
        socket.close(1000, 'Command sent');
      else if (socket) socket.terminate();
    }
  }
}