export function Main(mainClass: { main: (args: string[]) => void }) {
  mainClass.main(process.argv.slice(2));
}