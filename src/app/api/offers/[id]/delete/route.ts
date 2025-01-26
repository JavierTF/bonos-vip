import { NextResponse } from 'next/server';
import Offer from '@/models/offer';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  try {
    const data = await req.json();

    const [updated] = await Offer.update(data, { where: { id: params.id } });
    
    if (!updated) return NextResponse.json({ error: 'Offer not found' }, { status: 404 });

    const offer = await Offer.findByPk(params.id);
    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating offer' }, { status: 500 });
  }
}