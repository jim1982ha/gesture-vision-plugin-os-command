/* FILE: extensions/plugins/os-command/frontend/index.js */

// Ensure the global registry exists
if (!window.GestureVisionPlugins) {
  window.GestureVisionPlugins = {};
}

const osCommandPluginFrontendModule = {
    manifest: { /* will be populated by loader */ },
    actionSettingsFields: () => {
        return [
            { id: 'osCommand', type: 'text', labelKey: 'osCommandLabel', placeholderKey: 'osCommandPlaceholder', helpTextKey: 'osCommandHelp', required: true },
            { id: 'osTarget', type: 'text', labelKey: 'osTargetLabel', placeholderKey: 'osTargetPlaceholder', helpTextKey: 'osTargetHelp' },
            { id: 'companionHost', type: 'text', labelKey: 'osCompanionHostLabel', placeholderKey: 'localhost', helpTextKey: 'osCompanionHostHelp' }
        ];
    },
    getActionDisplayDetails: (settings, context) => {
        const { translate } = context.services.translationService;
        const { GESTURE_CATEGORY_ICONS } = context.shared.constants;

        if (!settings?.osCommand) return [{ icon: GESTURE_CATEGORY_ICONS.UI_ERROR.iconName, value: translate("invalidOsCommandActionSettings") }];
        
        const details = [{ icon: GESTURE_CATEGORY_ICONS.UI_TERMINAL.iconName, value: settings.osCommand }];
        if (settings.osTarget) details.push({ icon: GESTURE_CATEGORY_ICONS.UI_DESKTOP.iconName, value: settings.osTarget });
        if (settings.companionHost) details.push({ icon: GESTURE_CATEGORY_ICONS.UI_DNS.iconName, value: `${translate("Host")}: ${settings.companionHost}` });
        
        return details;
    },
};

// Register the module with the global registry
window.GestureVisionPlugins['gesture-vision-plugin-os-command'] = osCommandPluginFrontendModule;

export default osCommandPluginFrontendModule;