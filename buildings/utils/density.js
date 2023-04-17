export const density1 = '█▓▒░ ';
export const density2 = '┃━┏┓┗┛┣┫┳┻╋'
export const density3 =  ' ○•◘█'
export const density4 = '╣║╗╝╚╔╩╦╠═╬'
export const djapanese = '大一花'
export const dkannada = 'ೞಲಇಐ'
export const density5 = '█ ';



export const densities = [density1, density2, density3, density4, density5]

let density = densities[Math.floor(Math.random() * densities.length)]
density = density.split('').sort((a, b) => 0.5 - Math.random()).join('')

export const rdensity = density