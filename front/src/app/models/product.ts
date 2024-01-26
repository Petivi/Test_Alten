export class Product {
    constructor(
        public id: number, 
        public code: string, 
        public name: string,
        public description: string,
        public image: string,
        public price: number,
        public category: string,
        public quantity: number,
        public inventoryStatus: string,
        public rating: number,
    ) {}
}
