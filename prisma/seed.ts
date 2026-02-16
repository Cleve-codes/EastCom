import { PrismaClient, Category } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding database...')

    // Clear existing data
    await prisma.product.deleteMany()

    const products = [
        {
            slug: 'jinko-tiger-neo-475w',
            name: 'Jinko Tiger Neo N-type 475W',
            description: 'High efficiency N-type monocrystalline module with SMBB technology. Ideal for residential and commercial rooftops.',
            price: 18500,
            category: Category.Panels,
            images: ['/images/s18.jpg'],
            stock: 50,
            specs: { wattage: '475W', technology: 'N-type Mono', warranty: '25 Years', efficiency: '22.3%' },
            featured: true
        },
        {
            slug: 'canadian-solar-550w',
            name: 'Canadian Solar HiKu6 550W',
            description: 'Super high power mono PERC module. Lower LCOE and system cost.',
            price: 22000,
            category: Category.Panels,
            images: ['/images/s2.jpg'],
            stock: 120,
            specs: { wattage: '550W', technology: 'Mono PERC', warranty: '12 Years Product, 25 Years Output' },
            featured: false
        },
        {
            slug: 'growatt-spf-5000-es',
            name: 'Growatt SPF 5000 ES',
            description: 'Off-grid inverter 5kW 48V. Integrated MPPT charge controller. Supports WiFi monitoring.',
            price: 85000,
            category: Category.Inverters,
            images: ['/images/i1.jpeg'],
            stock: 15,
            specs: { power: '5kW', voltage: '48V', type: 'Off-Grid', monitoring: 'WiFi Included' },
            featured: true
        },
        {
            slug: 'deye-sun-8k-sg01',
            name: 'Deye 8kW Hybrid Inverter',
            description: 'Three phase hybrid inverter. Supports diesel generator input. Color touch LCD.',
            price: 180000,
            category: Category.Inverters,
            images: ['/images/i2.jpeg'],
            stock: 5,
            specs: { power: '8kW', voltage: '48V', type: 'Hybrid', phases: '3-Phase' },
            featured: false
        },
        {
            slug: 'felicity-lithium-5kwh',
            name: 'Felicity 5kWh LiFePO4 Battery',
            description: '48V 100Ah Lithium Iron Phosphate battery. 6000 cycles at 80% DOD.',
            price: 135000,
            category: Category.Batteries,
            images: ['/images/b7.jpg'],
            stock: 20,
            specs: { capacity: '5kWh', voltage: '48V', chemistry: 'LiFePO4', cycles: '6000+' },
            featured: true
        },
        {
            slug: 'pylontech-us3000c',
            name: 'Pylontech US3000C 3.5kWh',
            description: 'Modular Li-ion battery storage system. Compact design and easy installation.',
            price: 165000,
            category: Category.Batteries,
            images: ['/images/b19.jpg'],
            stock: 8,
            specs: { capacity: '3.5kWh', voltage: '48V', chemistry: 'LiFePO4', modular: 'Yes' },
            featured: false
        },
        {
            slug: 'home-essential-3kw',
            name: 'Home Essential 3kW System',
            description: 'Complete backup solution for small homes. Includes 3kW inverter, 2.5kWh battery, and 4 panels.',
            price: 350000,
            category: Category.Systems,
            images: ['/images/system6.jpeg'],
            stock: 10,
            specs: { inverter: '3kW Hybrid', battery: '2.5kWh Lithium', panels: '4x 450W', installation: 'Included' },
            featured: true
        },
        {
            slug: 'commercial-pro-20kw',
            name: 'Commercial Pro 20kW System',
            description: 'Scalable solution for offices and factories. Reduces grid dependence significantly.',
            price: 2500000,
            category: Category.Systems,
            images: ['/images/system8.jpeg'],
            stock: 2,
            specs: { inverter: '20kW 3-Phase', battery: '30kWh Lithium', panels: '40x 550W', monitoring: 'Advanced Portal' },
            featured: false
        }
    ]

    for (const p of products) {
        const product = await prisma.product.create({ data: p })
        console.log(`Created product with id: ${product.id}`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
