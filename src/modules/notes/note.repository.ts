import { supabase } from "@/lib/supabase";

export const noteRepository = {
  async create(userId: string, params: { title?: string; parentId?: number }) {
    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: userId,
          title: params.title,
          parent_document: params.parentId,
        },
      ])
      .select()
      .single();
    if (error !== null) throw new Error(error.message);
    return data;
  },
  async find(useId: string, parentDocumentId: number) {
    const query = supabase
      .from("notes")
      .select()
      .eq("user_id", useId)
      .order("created_at", { ascending: false });
    const { data } =
      parentDocumentId !== null
        ? await query.eq("parent_document", parentDocumentId)
        : await query.is("parent_document", null);
    return data;
  },
};
