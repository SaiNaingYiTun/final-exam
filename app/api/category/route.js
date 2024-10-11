import Category from '@/models/Category';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  try {
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const category = new Category(body);
    await category.save();
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}