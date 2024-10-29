import { Module } from 'module';

interface RequireModule {
  require: (modPath: string) => unknown;
}

const requireModule: RequireModule = {
  require: (modPath: string): unknown => {
    return require(modPath);
  }
};

export = requireModule;