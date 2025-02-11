export const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(
       ` https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":` Bearer ${process.env.SANITY_API_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [{ delete: { id: orderId } }],
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Order Deleted:", result);
      return result;
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };