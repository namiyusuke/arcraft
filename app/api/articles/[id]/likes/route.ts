import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { articleLikesSchema } from "@/db/schemas/article-likes";
import { eq, and, count } from "drizzle-orm";
import { headers } from "next/headers";

async function getUserIdentifier() {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") || "unknown";
}
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userIdentifier = await getUserIdentifier();
  const articleId = (await params).id;

  const likeCountResult = await db
    .select({ value: count() })
    .from(articleLikesSchema)
    .where(eq(articleLikesSchema.articleId, articleId));

  const likeCount = likeCountResult[0]?.value || 0;

  const userLikeResult = await db
    .select()
    .from(articleLikesSchema)
    .where(and(eq(articleLikesSchema.articleId, articleId), eq(articleLikesSchema.userIdentifier, userIdentifier)))
    .limit(1);

  const isLiked = userLikeResult.length > 0;

  return NextResponse.json({ count: likeCount, isLiked });
}
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // TODO: 以下を実装してください
  // 1. getUserIdentifier()でユーザー識別子を取得
  const userIdentifier = await getUserIdentifier();
  // 2. await params で articleId を取得
  const articleId = (await params).id;
  // 3. db.insert(articleLikesSchema).values({ articleId, userIdentifier }) でいいねを挿入
  try {
    await db.insert(articleLikesSchema).values({ articleId, userIdentifier });
  } catch (error) {
    // ユニーク制約違反の場合は無視
    console.error("Error inserting like:", error);
  }
  return NextResponse.json({ success: true });
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userIdentifier = await getUserIdentifier();
  const articleId = (await params).id;
  await db
    .delete(articleLikesSchema)
    .where(and(eq(articleLikesSchema.articleId, articleId), eq(articleLikesSchema.userIdentifier, userIdentifier)));
  return NextResponse.json({ success: true });
}
