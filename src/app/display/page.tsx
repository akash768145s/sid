import Product from '@/models/Product';
import connect from '@/utils/db';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const ProductsPage = async () => {
    await connect();
    const products = await Product.find({});

    return (
        <div className="p-24">
            <h1 className="text-2xl font-bold mb-4">Product Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4">
                        <Image src={product.imageUrl} alt={product.name} width={500} height={300} />
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <p>{product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
