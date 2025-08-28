# gesture-vision-plugin-os-command

Executes commands on the operating system via a companion app.

---

<p align="center">
  <img src="https://raw.githubusercontent.com/jim1982ha/gesture-vision/main/packages/frontend/public/icons/icon-72.webp" width="80" alt="OS Command Plugin Icon">
</p>
<h1 align="center">GestureVision - OS Command Plugin</h1>
<p align="center">
  <strong>Control your computer directly with gestures by sending commands to a lightweight companion application.</strong>
</p>

---

The OS Command plugin bridges the gap between your browser and your operating system. It allows you to trigger keyboard shortcuts, run scripts, or execute pre-defined commands on a computer running the **GestureVision Companion App**.

**Important:** This plugin is powerless on its own. It requires the separate [GestureVision Companion App](https://github.com/your-repo/gesture-vision-companion) to be running on the target machine.

## ✨ Key Features

-   **Cross-Platform Control:** Send commands to any Windows, macOS, or Linux machine running the companion app.
-   **Targeted Actions:** Optionally specify a target application or window title for commands (e.g., send "next_track" only to Spotify).
-   **Flexible Commands:** The companion app defines the available commands (e.g., `key_tap:space`, `mouse_click`, `run_script:/path/to/script.sh`), providing a secure and configurable layer.
-   **Network Capable:** Control a different computer on your network by specifying its IP address.

## 🔧 Configuration

This plugin has no global configuration. All settings are configured per action.

### Action Configuration

When you select "OS Command" as the Action Type for a gesture, you will see the following fields:

-   **Command:** The command string to be executed by the companion app (e.g., `media_play_pause`, `key_tap:ArrowUp`).
-   **Target App/Window (Optional):** The name or title of the application that should be focused before executing the command.
-   **Companion Host (Optional):** The IP address or hostname of the machine running the companion app. Defaults to `localhost` (the same machine running the GestureVision server).

## 🚀 Usage Example

**Goal:** Use a "Thumb Up" gesture to increase the volume on your media center PC (IP: 192.168.1.100).

1.  Ensure the **GestureVision Companion App** is running on the media center PC at `192.168.1.100`.
2.  Go to the **Gesture Settings** panel in the GestureVision web UI.
3.  Select **"Thumb Up"** from the Gesture dropdown.
4.  For **Action Type**, select **"OS Command"**.
5.  Configure the action settings:
    -   **Command:** `media_volume_up`
    -   **Target App/Window:** (leave blank for system-wide control)
    -   **Companion Host:** `192.168.1.100`
6.  Click **Add Configuration**.

Now, when you give a thumbs-up, the command will be sent over the network to the companion app, which will then execute the system's volume up command.

---

Part of the **GestureVision** application.