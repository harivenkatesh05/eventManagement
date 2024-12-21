import { NextRequest, NextResponse } from "next/server";
import { clearAllRuntime, clearModelRuntime } from "@/lib/runtimeDataStore";
import { getUserIdFromToken } from "../../utility";

export async function POST(request: NextRequest) {
    try {
        const userId = await getUserIdFromToken(request);
        if(userId !== "67606b08bc7c529fa74a1528") {
            return NextResponse.json({ message: 'You are not authorized to clear the runtime store' });
        }
        
        const { model } = await request.json();

        if (model) {
            clearModelRuntime(model);
            return NextResponse.json({ message: `Runtime store cleared for ${model}` });
        }

        clearAllRuntime();
        return NextResponse.json({ message: 'All runtime stores cleared' });

    } catch (error) {
        console.error('Clear runtime store error:', error);
        return NextResponse.json(
            { error: 'Failed to clear runtime store' },
            { status: 500 }
        );
    }
} 