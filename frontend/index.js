/* FILE: extensions/plugins/os-command/frontend/index.js */
const { translate } = window.GestureVision.services;

const osCommandPluginFrontendModule = {
    manifest: { /* will be populated by loader */ },
    actionSettingsFields: [
        { id: 'osCommand', type: 'text', labelKey: 'osCommandLabel', placeholderKey: 'osCommandPlaceholder', helpTextKey: 'osCommandHelp', required: true },
        { id: 'osTarget', type: 'text', labelKey: 'osTargetLabel', placeholderKey: 'osTargetPlaceholder', helpTextKey: 'osTargetHelp' },
        { id: 'companionHost', type: 'text', labelKey: 'osCompanionHostLabel', placeholderKey: 'localhost', helpTextKey: 'osCompanionHostHelp' }
    ],
    getActionDisplayDetails: (settings) => {
        if (!settings?.osCommand) return [{ icon: 'error_outline', value: translate("invalidOsCommandActionSettings") }];
        const details = [{ icon: 'terminal', value: settings.osCommand }];
        if (settings.osTarget) details.push({ icon: 'desktop_windows', value: settings.osTarget });
        if (settings.companionHost) details.push({ icon: 'dns', value: `${translate("Host")}: ${settings.companionHost}` });
        return details;
    },
};
export default osCommandPluginFrontendModule;