import { appendFile, mkdir, stat } from "fs/promises";
import { join } from "path";

const logDir = join(__dirname, "./logs");
const logFile = join(logDir, "log1.log");

const writeLog = async () => {
  await appendFile(logFile, `${new Date().toISOString()}\n`);
  console.log("#writeLog save log");
};

const main = async () => {
  try {
    // Check if the directory exists
    await stat(logDir);
  } catch (err: any) {
    // If directory doesn't exist, create it
    if (err.code === "ENOENT") {
      await mkdir(logDir, { recursive: true });
      console.log(`Created directory: ${logDir}`);
    } else {
      throw err; // Rethrow any other error
    }
  }

  setInterval(async () => {
    await writeLog();
  }, 1_000);
};

main().catch(console.log);
