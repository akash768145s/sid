import connect from "../../../utils/db"; // Adjust the path as needed
import Contact from "../../../models/Contact"; // Define this model to match your schema

export async function POST(req) {
  try {
    await connect(); // Ensure the database connection is established

    const { sellerName, productName, sellerEmail, buyerEmail } =
      await req.json();

    // Create a new contact entry
    const newContact = new Contact({
      sellerName,
      productName,
      sellerEmail,
      buyerEmail, // Add buyer's email here
    });

    await newContact.save();
    return new Response(
      JSON.stringify({ message: "Contact request stored successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact request:", error);
    return new Response(
      JSON.stringify({ message: "Error saving contact request." }),
      { status: 500 }
    );
  }
}
