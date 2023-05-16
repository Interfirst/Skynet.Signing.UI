export const previewData = {
  id: 'e332f64f-0e32-4216-89de-c0b10ae46588',
  files: {
    combinedPdfFile: {
      // this link is often outdated. go to forms and copy working link
      location:
        'https://dev-skynet-signing-api.azurewebsites.net/api/signingRequests/297436cb-a586-4c65-a128-99ef04cdd974/files/completed',
      name: 'signing1-23',
    },
    files: [
      {
        fileName: 'file1',
        pagesNumber: 5,
      },
    ],
  },
  mode: {
    type: 'Test',
  },
  signatures: [
    {
      id: {
        requestId: 'e332f64f-0e32-4216-89de-c0b10ae465882233555',
        signer: {
          name: 'Some name',
          email: 'someemail@email.email',
        },
      },
      history: {
        allStatuses: [
          {
            performedDate: '2022-03-03T12:20:00',
            type: 'Created',
          },
          {
            signatures: [
              {
                tagId: 'a5f7b806-26ae-4ef6-801f-4364d12e7eb9',
                type: 'Hidden',
              },
              {
                tagId: '253e982e-65c4-4836-91c7-7dd4e8399ef9',
                type: 'Hidden',
              },
            ],
            performedDate: '2022-03-03T12:30:00',
            type: 'Created',
          },
        ],
      },
      status: {
        signatures: [
          {
            tagId: 'a5f7b806-26ae-4ef6-801f-4364d12e7eb9',
            type: 'Hidden',
          },
          {
            tagId: '253e982e-65c4-4836-91c7-7dd4e8399ef9',
            type: 'Hidden',
          },
        ],
        performedDate: '2022-03-03T12:30:00',
        type: 'Created',
      },
      tags: [
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322pp11',
          tag: {
            type: {
              rule: 'require_1',
              group: 'zz123466',
              checkedByDefault: false,
              name: 'radio',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 83,
                y: 83,
              },
              size: {
                width: 222,
                height: 40,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322pp22',
          tag: {
            type: {
              rule: 'require_1',
              group: 'zz123466',
              checkedByDefault: false,
              name: 'radio',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 83,
                y: 110,
              },
              size: {
                width: 222,
                height: 40,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322xx11',
          tag: {
            type: {
              rule: 'require_1-ormore',
              group: 'zz1234',
              checkedByDefault: false,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 283,
                y: 123,
              },
              size: {
                width: 222,
                height: 40,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322xx22',
          tag: {
            type: {
              rule: 'require_1-ormore',
              group: 'zz1234',
              checkedByDefault: false,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 373,
                y: 143,
              },
              size: {
                width: 222,
                height: 60,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322xx33',
          tag: {
            type: {
              rule: 'require_1-ormore',
              group: 'zz1234',
              checkedByDefault: true,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 323,
                y: 163,
              },
              size: {
                width: 222,
                height: 40,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322xx',
          tag: {
            type: {
              checkedByDefault: true,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: true,
            location: {
              coordinate: {
                x: 223,
                y: 123,
              },
              size: {
                width: 222,
                height: 222,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d25322',
          tag: {
            type: {
              rule: 'require_1',
              group: 'zz123',
              checkedByDefault: true,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 123,
                y: 123,
              },
              size: {
                width: 222,
                height: 222,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d253222',
          tag: {
            type: {
              rule: 'require_1',
              group: 'zz123',
              checkedByDefault: false,
              name: 'check',
            },
            signer: 'Some name',
            isRequired: false,
            location: {
              coordinate: {
                x: 123,
                y: 143,
              },
              size: {
                width: 222,
                height: 222,
              },
              pageNumber: 1,
            },
          },
        },
        {
          id: 'a5f7b806-26ae-4ef6-801f-4364d12e7eb9',
          tag: {
            type: {
              name: 'sig',
            },
            signer: 'Some name',
            isRequired: true,
            location: {
              coordinate: {
                x: 123,
                y: 123,
              },
              size: {
                width: 222,
                height: 30,
              },
              pageNumber: 2,
            },
          },
        },
        {
          id: '253e982e-65c4-4836-91c7-7dd4e8399ef9',
          tag: {
            type: {
              name: 'initial',
            },
            signer: 'Some name',
            isRequired: true,
            location: {
              coordinate: {
                x: 256,
                y: 256,
              },
              size: {
                width: 222,
                height: 60,
              },
              pageNumber: 1,
            },
          },
        },
      ],
      groups: [
        { id: 'zz123466', rule: 'require_1' },
        { id: 'zz123', rule: 'require_1' },
        { id: 'zz1234', rule: 'require_1-ormore' },
      ],
    },
    {
      id: {
        requestId: 'e332f64f-0e32-4216-89de-c0b10ae46588',
        signer: {
          name: 'Some other name',
          email: 'someemail@email.email',
        },
      },
      history: {
        allStatuses: [
          {
            performedDate: '2022-03-03T12:20:00',
            type: 'Created',
          },
        ],
      },
      status: {
        performedDate: '2022-03-03T12:20:00',
        type: 'Created',
      },
      tags: [
        {
          id: '4c17d6d0-7292-404b-a82d-7428ed20d253',
          tag: {
            type: {
              name: 'text',
            },
            signer: 'Some other name',
            isRequired: true,
            location: {
              coordinate: {
                x: 123,
                y: 123,
              },
              size: {
                width: 122,
                height: 40,
              },
              pageNumber: 1,
            },
          },
        },
      ],
    },
  ],
  status: {
    totalCount: 2,
    processedCount: 1,
    openedCount: 0,
    percentage: 50,
    processingCount: 1,
    performedDate: '2022-03-03T12:30:00',
    type: 'InProgress',
  },
  history: {
    allStatuses: [
      {
        performedDate: '2022-03-03T12:20:00',
        type: 'Created',
      },
      {
        totalCount: 2,
        processedCount: 1,
        openedCount: 0,
        percentage: 50,
        processingCount: 1,
        performedDate: '2022-03-03T12:30:00',
        type: 'InProgress',
      },
    ],
  },
};

export const defaultProps = {
  getDomainName: () => 'dev-skynet.cyberdynemortgage.com',
  signingRequestId: '03a91138-7721-40d8-bc8f-5d1477edc928',
  getToken: () =>
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vaW50ZXJmaXJzdC5jb20vaWRlbnRpdHkvY2xhaW1zL0lkIjoiOWNkMTEyNWQtODU2My00MTg4LWFiZmEtMzYwNTAxNDMwZGQwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvdXBuIjoicnJlbW5pb3ZAaW50ZXJmaXJzdC5jb20iLCJodHRwOi8vaW50ZXJmaXJzdC5jb20vaWRlbnRpdHkvY2xhaW1zL0NvbXBhbnlJZCI6IjUwMDA0MGQyLWZlZDQtNDk4ZS1iOWNjLTY0YzFkNmQ1ZWYwYyIsImh0dHA6Ly9pbnRlcmZpcnN0LmNvbS9pZGVudGl0eS9jbGFpbXMvQ2xpZW50SWQiOiJBZG1pblBhbmVsIiwiZXhwIjoxNjg0MjQ0NzkyLCJpc3MiOiJodHRwczovL2Rldi1za3luZXQtYWNjb3VudHMtYXBpLmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjoiQWRtaW5QYW5lbCJ9.sDOGf6Rn2KCXdCnbSEl3-_-m6CHGsmsBBhOsG-L-Xuc',
};
