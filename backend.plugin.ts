/* FILE: extensions/plugins/os-command/backend.plugin.ts */
import { BaseBackendPlugin } from '#backend/plugins/base-backend.plugin.js';
import { OsCommandActionHandler } from './action-handler.os-command.js';
import { OsCommandActionSettingsSchema } from './schemas.js';
import { WebSocketConnectionManager } from '#shared/services/connection-manager.js';
import manifest from './plugin.json' with { type: 'json' };
import type { PluginManifest } from "#shared/index.js";

class OsCommandBackendPlugin extends BaseBackendPlugin {
  #connectionManager: WebSocketConnectionManager;

  constructor() {
    const connectionManager = new WebSocketConnectionManager();
    super(manifest as PluginManifest, new OsCommandActionHandler(connectionManager));
    this.#connectionManager = connectionManager;
  }

  getActionConfigValidationSchema() {
    return OsCommandActionSettingsSchema;
  }

  async destroy(): Promise<void> {
    this.#connectionManager.destroy();
  }
}

export default OsCommandBackendPlugin;