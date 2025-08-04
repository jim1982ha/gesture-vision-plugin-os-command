/* FILE: extensions/plugins/os-command/schemas.ts */
import { z } from 'zod';

// Settings for a specific action instance
export interface OsCommandActionInstanceSettings {
    osCommand: string;
    osTarget?: string;
    companionHost?: string;
}

export const OsCommandActionSettingsSchema = z.object({
    osCommand: z.string().min(1, { message: "OS Command is required" }),
    osTarget: z.string().optional(),
    companionHost: z.string().optional(),
});