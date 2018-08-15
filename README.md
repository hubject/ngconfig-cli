# ngconfig-cli

> A command line tool to create angular constants from json files.

## Installation
```shell
npm install @hubject/ngconfig --save-dev
```

## Usage
```shell
ngconfig [configJsonPath] [outputJsPath] [--moduleName|-m <string>] [--useExistingModule|-x <boolean>] [--interface|-t <boolean>] [--imports|-i <array>] [--exports|-e <string>]
```

### Example

```shell
ngconfig ./config.dev.json ./config.prod.json ./config.json ./src/app/modules/core/config/config.ts -m intercharge.core -x -i ../core -o -t
```

#### Input
`config.dev.json`
```json
{
  "env": {
    "development": {
      "settings": {
        "apiEndpoint": "https://app-dev.eroaming-platform.com/v1/"
      }
    }
  }
}
```
`config.json`
```json
{
  "env": {
    "version": 1.2.3,
    "default": {
      "settings": {
        "soap": {
          "timeout": 3000
        },
      }
    }
  }
}
```

#### Output
`config.ts`
```ts
import '../core';

export const env = {
  "development": {
    "settings": {
      "apiEndpoint": "https://app-dev.eroaming-platform.com/v1/"
    }
  },
  "version": 1.2.3,
  "default": {
    "settings": {
      "soap": {
        "timeout": 3000
      }
    }
  }
};

export interface ISettings {
  /* ... */
}
```
