import { loadStripe } from "@stripe/stripe-js";

export default function BuyProduct() {
  const handleBuy = async () => {
    const stripe = await loadStripe(
      "pk_test_51OsnSiSCYJhYhwAnl1OhMTQ1ZBBGy9nJZcRsHzQWLj1cfBwToiNyuk0BAELYjq2z4PH2rZtAPInwzaEhV97PuxSP00YdKxlibp"
    );

    const body = {
      products: [
        {
          _id: "65ed7cfb7e0f56bffee0f489",
          productName: "apple watch",
          desc: "nice in the world",
          price: 468,
          stock: 50,
          discountedPrice: 450,
          userRef: "65e77e08e706d65678228580",
          imageURLs: [
            "https://firebasestorage.googleapis.com/v0/b/real-estate-6a0f1.appspot.com/o/1710062814723strategy-plan-768x399.jpg?alt=media&token=4d88e80b-54ea-4b6f-a4b4-ffc2558c0d12",
          ],
          review: [],
          __v: 0,
        },
      ],
    };
    const header = {
      "Content-Type": "Application/json",
    };
    const res = await fetch("/api/search/buy", {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    });
    const session = await res.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <div>
      <button onClick={handleBuy}>buy now</button>
    </div>
  );
}
