import * as os from "os";
import * as child_process from "child_process";
import * as vscode from "vscode";
import * as path from "path";

export function getContentToCheck(line: string) {
    const commentLine = line.match(/\/\/\s*(.*)|#\s*(.*)|<!--\s*(.*?)\s*-->|\/\*\s*(.*?)\s*\*\//);
    const contentToCheck = commentLine
        ? (commentLine[1] || commentLine[2] || commentLine[3] || commentLine[4])?.trim()
        : line.trim();

    return contentToCheck;
}

export function runCommandInExternalTerminal(command: string): void {
    const platform = os.platform();

    // Get VSCode's integrated terminal profile settings
    const terminalConfig = vscode.workspace.getConfiguration("terminal.integrated");

    // Determine the current working directory
    const getCwd = (): string => {
        // If there's an active file, use its directory
        // if (vscode.window.activeTextEditor?.document.uri.fsPath) {
        //     return path.dirname(vscode.window.activeTextEditor.document.uri.fsPath);
        // }
        // If there's a workspace folder, use that
        if (vscode.workspace.workspaceFolders?.[0]) {
            return vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        // Fallback to user's home directory
        return os.homedir();
    };

    const cwd = getCwd();

    switch (platform) {
        case "win32": {
            const defaultProfile = terminalConfig.get<string>("defaultProfile.windows") || "PowerShell";
            const profiles = terminalConfig.get<Record<string, any>>("profiles.windows") || {};

            const shellCommand = (() => {
                const profile = profiles[defaultProfile];
                const shellPath = profile?.path || defaultProfile;

                switch (shellPath.toLowerCase()) {
                    case "powershell":
                    case "powershell.exe":
                        return `start powershell -NoExit -Command "cd '${cwd}'; ${command}"`;
                    case "pwsh":
                    case "pwsh.exe":
                        return `start pwsh -NoExit -Command "cd '${cwd}'; ${command}"`;
                    case "wt":
                    case "wt.exe":
                        return `wt new-tab --title "External Command" --startingDirectory "${cwd}" powershell -NoExit -Command "${command}"`;
                    case "git-bash":
                    case "git-bash.exe":
                        return `"${process.env.PROGRAMFILES}\\Git\\git-bash.exe" --cd="${cwd}" -c "${command}"`;
                    case "cygwin":
                        return `"${process.env.PROGRAMFILES}\\Cygwin\\bin\\bash.exe" --login -c "cd '${cwd}' && ${command}"`;
                    case "mintty":
                    case "mintty.exe":
                        return `"${process.env.PROGRAMFILES}\\Git\\usr\\bin\\mintty.exe" --dir "${cwd}" -e bash -c "${command}"`;
                    default:
                        return `start cmd.exe /K "cd /d "${cwd}" && ${command}"`;
                }
            })();

            child_process.exec(shellCommand, { cwd }, error => {
                if (error) {
                    console.error(`Failed to spawn Windows terminal: ${error}`);
                }
            });
            break;
        }

        case "darwin": {
            const script = `tell application "Terminal"
                do script "cd '${cwd.replace(/'/g, "\\'")}' && ${command.replace(/'/g, "\\'")}"
                activate
            end tell`;

            child_process.exec(`osascript -e '${script}'`, { cwd }, error => {
                if (error) {
                    console.error(`Failed to spawn macOS terminal: ${error}`);
                }
            });
            break;
        }

        case "linux": {
            const terminals = [
                { cmd: "gnome-terminal", args: ["--working-directory", cwd, "--"] },
                { cmd: "konsole", args: ["--workdir", cwd, "--noclose", "-e"] },
                { cmd: "xterm", args: ["-hold", "-e"] },
                { cmd: "x-terminal-emulator", args: ["-e"] },
                { cmd: "terminator", args: ["--working-directory", cwd, "-e"] },
            ];

            const defaultProfile = terminalConfig.get<string>("defaultProfile.linux");
            if (defaultProfile) {
                const profiles = terminalConfig.get<Record<string, any>>("profiles.linux") || {};
                const profile = profiles[defaultProfile];
                if (profile?.path) {
                    spawnLinuxTerminal(profile.path, ["-e"], command, cwd);
                    return;
                }
            }

            for (const terminal of terminals) {
                try {
                    child_process.execSync(`which ${terminal.cmd}`, { stdio: "ignore" });
                    spawnLinuxTerminal(terminal.cmd, terminal.args, command, cwd);
                    return;
                } catch (error) {
                    continue;
                }
            }

            console.error("No suitable terminal found on Linux");
            break;
        }

        default:
            console.error(`Unsupported platform: ${platform}`);
    }
}

function spawnLinuxTerminal(terminalCmd: string, args: string[], command: string, cwd: string): void {
    const spawnArgs = [...args, command];

    const process = child_process.spawn(terminalCmd, spawnArgs, {
        stdio: "ignore",
        detached: true,
        cwd,
    });

    process.unref();

    process.on("error", error => {
        console.error(`Failed to spawn Linux terminal (${terminalCmd}): ${error}`);
    });
}
