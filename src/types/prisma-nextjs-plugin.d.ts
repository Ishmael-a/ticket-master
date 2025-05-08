// prisma-nextjs-plugin.d.ts
declare module "@prisma/nextjs-monorepo-workaround-plugin" {
  import { webpack } from "webpack";

  export class PrismaPlugin {
    constructor();
    apply(compiler: webpack.Compiler): void;
  }
}
