### Recomendation

Below you can read 2 ways how to use this package. I advise to run this package locally with option 1.
This option supports Hot Module Reload. After you made changes you can use option 2 and check how it's embedded into application

### There are 2 ways to use this package:

1. `npm i`, `npm start` inside of this package. In this case need to provide signingRequestId and autorizationToken to FormPreviewContent defaultProps.
   Also for some cases you can use stub data (FormPreview.stubData) - in FormPreviewContent you need to `setData` instead of real one.

2. `import @interfirst/signing-custom-service` into your module. In this case need to rebuild (`yarn build:signing-custom-service` or just `yarn`) after every change. In this case you don't need to provide any props manually.
