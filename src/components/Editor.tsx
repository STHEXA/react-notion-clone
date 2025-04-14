import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { ja } from "@blocknote/core/locales";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useCreateBlockNote({ dictionary: ja });
  return (
    <div>
      <BlockNoteView editor={editor} />
    </div>
  );
}

export default Editor;
