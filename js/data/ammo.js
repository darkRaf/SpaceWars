export const AMMO = [
  {
    name: 'Missiles',
    speed: 3.5,
    count: 200,
    power: 6,
    max: 999,
    data: [
      {
        method: 'lineTo',
        fill: false,
        stroke: true,
        color: '#ffffff',
        cords: [
          [0, 0],
          [0, 2],
        ],
      },
      {
        method: 'lineTo',
        fill: false,
        stroke: true,
        color: '#fdf03b',
        cords: [
          [0, 2],
          [0, 5],
        ],
      },
      {
        method: 'lineTo',
        fill: false,
        stroke: true,
        color: '#ee1111',
        cords: [
          [0, 5],
          [0, 20],
        ],
      },
    ],
    svg: `<svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_906_239)">
    <path d="M50 6C47.4884 9.44281 46.8195 12.9503 46 20H54C53.1288 13.1077 52.4379 9.65866 50 6Z" fill="#D17928" stroke="#A55E1D"/>
    <rect x="45.5" y="20.5" width="9" height="24" fill="#949494" stroke="#6F6F6F"/>
    <path d="M47.5 27.5V43.5M47 19.5C47.128 16.9706 48.5 11.5 48.5 11.5" stroke="#F0F0F0"/>
    <path d="M38 6C35.4884 9.44281 34.8195 12.9503 34 20H42C41.1288 13.1077 40.4379 9.65866 38 6Z" fill="#D17928" stroke="#A55E1D"/>
    <rect x="33.5" y="20.5" width="9" height="24" fill="#949494" stroke="#6F6F6F"/>
    <path d="M35.5 27.5V43.5M35 19.5C35.128 16.9706 36.5 11.5 36.5 11.5" stroke="#F0F0F0"/>
    <path d="M25 6C22.4884 9.44281 21.8195 12.9503 21 20H29C28.1288 13.1077 27.4379 9.65866 25 6Z" fill="#D17928" stroke="#A55E1D"/>
    <rect x="20.5" y="20.5" width="9" height="24" fill="#949494" stroke="#6F6F6F"/>
    <path d="M22.5 27.5V43.5M22 19.5C22.128 16.9706 23.5 11.5 23.5 11.5" stroke="#F0F0F0"/>
    <path d="M62 6C59.4884 9.44281 58.8195 12.9503 58 20H66C65.1288 13.1077 64.4379 9.65866 62 6Z" fill="#D17928" stroke="#A55E1D"/>
    <rect x="57.5" y="20.5" width="9" height="24" fill="#949494" stroke="#6F6F6F"/>
    <path d="M59.5 27.5V43.5M59 19.5C59.128 16.9706 60.5 11.5 60.5 11.5" stroke="#F0F0F0"/>
    <path d="M74 6C71.4884 9.44281 70.8195 12.9503 70 20H78C77.1288 13.1077 76.4379 9.65866 74 6Z" fill="#D17928" stroke="#A55E1D"/>
    <rect x="69.5" y="20.5" width="9" height="24" fill="#949494" stroke="#6F6F6F"/>
    <path d="M71.5 27.5V43.5M71 19.5C71.128 16.9706 72.5 11.5 72.5 11.5" stroke="#F0F0F0"/>
    </g>
    <defs>
    <clipPath id="clip0_906_239">
    <rect width="100" height="50" fill="white"/>
    </clipPath>
    </defs>
    </svg>`,
  },
  {
    name: 'Reckets',
    speed: 3.8,
    count: 50,
    power: 10,
    max: 100,
    data: [
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ee1111',
        cords: [
          [0, 0],
          [-1, 3],
          [1, 3],
          [0, 0],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [-1, 4],
          [-1, 20],
          [1, 20],
          [1, 4],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [-1, 15],
          [-3, 20],
          [-3, 24],
          [-3, 20],
          [-1, 15],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [1, 15],
          [3, 20],
          [3, 24],
          [3, 20],
          [1, 15],
        ],
      },
    ],
    svg: `<svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M90 25C83.7697 21.6851 80.266 20.5248 74 20.5V29.5C80.317 29.4856 83.833 28.3239 90 25Z" fill="url(#paint0_linear_907_280)" stroke="#FF0202"/>
    <path d="M9 15L14 20V30L9 36H20L29 30V20L20 15H9Z" fill="white" stroke="#F0F0F0"/>
    <rect x="14" y="20" width="60" height="10" fill="url(#paint1_linear_907_280)"/>
    <defs>
    <linearGradient id="paint0_linear_907_280" x1="78" y1="21" x2="78" y2="29" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FF0000"/>
    <stop offset="0.296875" stop-color="#FF5E5E"/>
    <stop offset="1" stop-color="#FF0000"/>
    </linearGradient>
    <linearGradient id="paint1_linear_907_280" x1="44" y1="20" x2="44" y2="30.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#999999"/>
    <stop offset="0.267359" stop-color="#ECECEC"/>
    <stop offset="1" stop-color="#323232"/>
    </linearGradient>
    </defs>
    </svg>`,
  },
  {
    name: 'Reckets2',
    speed: 4,
    count: 20,
    power: 15,
    max: 60,
    data: [
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#deb204',
        cords: [
          [0, 0],
          [-1, 3],
          [1, 3],
          [0, 0],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [-1, 4],
          [-1, 20],
          [1, 20],
          [1, 4],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [-1, 15],
          [-3, 20],
          [-3, 24],
          [-3, 20],
          [-1, 15],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [1, 15],
          [3, 20],
          [3, 24],
          [3, 20],
          [1, 15],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [-2, 5],
          [-4, 7],
          [-4, 8],
          [-2, 8],
          [-2, 5],
        ],
      },
      {
        method: 'lineTo',
        fill: true,
        stroke: true,
        color: '#ddd',
        cords: [
          [2, 5],
          [4, 7],
          [4, 8],
          [2, 8],
          [2, 5],
        ],
      },
    ],
    svg: `<svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M58 15L61 20V30L58 35H53V15H58Z" fill="white" stroke="#F0F0F0"/>
    <path d="M9 15L14 20V30L9 36H20L29 30V20L20 15H9Z" fill="white" stroke="#F0F0F0"/>
    <rect x="14" y="20" width="60" height="10" fill="url(#paint0_linear_909_305)"/>
    <path d="M53 25H61" stroke="#F0F0F0"/>
    <path d="M93 25C83.9297 18.3482 78.8613 16.2668 70 20V30C78.7609 33.9767 83.882 31.8252 93 25Z" fill="url(#paint1_linear_909_305)" stroke="#FFB802"/>
    <ellipse cx="84" cy="22.5" rx="1" ry="1.5" fill="black"/>
    <path d="M75 25C73.3881 26.9328 72.7267 28.2593 72 31C74.0533 31.6515 75.1403 31.845 77 32C75.0249 29.7499 74.7318 28.1586 75 25Z" fill="#BA0000" stroke="#FF0000"/>
    <defs>
    <linearGradient id="paint0_linear_909_305" x1="44" y1="20" x2="44" y2="30.5" gradientUnits="userSpaceOnUse">
    <stop stop-color="#999999"/>
    <stop offset="0.267359" stop-color="#ECECEC"/>
    <stop offset="1" stop-color="#323232"/>
    </linearGradient>
    <linearGradient id="paint1_linear_909_305" x1="77" y1="19" x2="77" y2="31" gradientUnits="userSpaceOnUse">
    <stop stop-color="#FFB802"/>
    <stop offset="0.296875" stop-color="#FFDD86"/>
    <stop offset="1" stop-color="#FEBD0E"/>
    </linearGradient>
    </defs>
    </svg>`,
  },
];
