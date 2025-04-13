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
  async find(useId: string, parentDocumentId?: number) {
    console.log("ki");
    const query = supabase
      .from("notes")
      .select()
      .eq("user_id", useId)
      .order("created_at", { ascending: false });
    console.log("query");
    console.log(query);
    const { data } =
      parentDocumentId !== undefined
        ? await query.eq("parent_document", parentDocumentId!)
        : await query.is("parent_document", null);
    return data;
  },
  async findOne(useId: string, id: number) {
    const { data } = await supabase
      .from("notes")
      .select()
      .eq("id", id)
      .eq("user_id", useId)
      .single();
    return data;
  },
  async update(id: number, note: { title?: string; content?: string }) {
    const { data } = await supabase
      .from("notes")
      .update(note)
      .eq("id", id)
      .select()
      .single();
    return data;
  },
};
