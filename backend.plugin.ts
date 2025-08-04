/* FILE: extensions/plugins/os-command/backend.plugin.ts */
import { BaseBackendPlugin } from '#backend/plugins/base-backend.plugin.js';
import { OsCommandActionHandler } from './action-handler.os-command.js';
import { OsCommandActionSettingsSchema } from './schemas.js';
import manifest from './plugin.json' with { type: 'json' };
import type { PluginManifest } from "#shared/types/index.js";

class OsCommandBackendPlugin extends BaseBackendPlugin {
  constructor() {
    super(manifest as PluginManifest, new OsCommandActionHandler());
  }

  getActionConfigValidationSchema() {
    return OsCommandActionSettingsSchema;
  }
}

export default OsCommandBackendPlugin;