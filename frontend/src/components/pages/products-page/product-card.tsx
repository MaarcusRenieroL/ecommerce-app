import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Heart, ShoppingCart} from "lucide-react";
import {FC} from "react";
import { Product } from "@/lib/types"

type Props = {
	product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
	return (
		<a key={product.id} href={`/products/${product.id}`}>
			<Card>
				<img
					src={"/assets/placeholder.svg"}
					alt={product.productName}
					className="w-full h-48 object-cover rounded-md mb-4 dark:brightness-[0.2] dark:grayscale"
				/>
				<CardContent className="p-4">
					<h3 className="font-semibold text-lg mb-2">
						{product.productName}
					</h3>
					<p className="font-bold">${product.price.toFixed(2)}</p>
				</CardContent>
				<CardFooter>
					<div className="hidden lg:flex items-center gap-5 w-full">
						<Button className="w-full">Add to Cart</Button>
						<Button variant="outline" className="w-full">
							Add to Wishlist
						</Button>
					</div>
					<div className="lg:hidden flex items-center justify-end gap-5">
						<Button size="icon">
                    <span>
                      <ShoppingCart className="h-4 w-4" />
                    </span>
						</Button>
						<Button variant="outline" size="icon">
							<Heart className="h-4 w-4" />
						</Button>
					</div>
				</CardFooter>
			</Card>
		</a>
	)
}