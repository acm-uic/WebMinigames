/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { CLEAR_EDITOR_COMMAND } from "lexical";

import * as React from "react";
import { useEffect } from "react";

export default function Editor({
  editorStateRef,
  editorError,
  posted,
  setPosted,
}) {
  const [editor] = useLexicalComposerContext(); // This hook provides access to the Lexical editor instance.

  useEffect(() => {
    if (posted) {
      // Clear the editor when the post button is clicked
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      setPosted(!posted); // Reset the posted state
    }
  }, [posted, editor]);

  const Placeholder = () => {
    return (
      <div className="  pointer-events-none absolute top-[1rem] left-[1.125rem] opacity-50">
        Start writing...
        <p className="text-red-500 text- text-sm lg:text-sm xs:text-xs ipad:text-sm md:text-sm min-h-[1rem]">
          {editorError || ""}
        </p>
      </div>
    );
  };

  return (
    <div className="editor-container">
      <div className="editor-inner">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="editor-input"
              placeholder={Placeholder}
              spellCheck={false}
            />
          }
        />

        <OnChangePlugin
          onChange={(editorState) => {
            editorStateRef.current = editorState;
          }}
        />
        <ClearEditorPlugin />
      </div>
    </div>
  );
}
