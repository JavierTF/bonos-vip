import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { Offer } from '@/models/offer'
import { authOptions } from '@/lib/auth'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const offer = await Offer.findByPk(params.id)
    if (!offer) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(offer)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching offer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const data = await req.json()
    const [updated] = await Offer.update(data, {
      where: { id: params.id }
    })
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      )
    }

    const offer = await Offer.findByPk(params.id)
    return NextResponse.json(offer)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating offer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const deleted = await Offer.destroy({
      where: { id: params.id }
    })
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Offer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting offer' },
      { status: 500 }
    )
  }
}