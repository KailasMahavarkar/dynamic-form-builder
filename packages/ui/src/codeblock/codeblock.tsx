import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { borderCVA } from "../codeblock/codeblock.cva";
import { makeDTI } from "../utils";

const CodeBlock = ({
    status,
    text,
    onChange,
    dataTestId = '',
}: {
    status: "maybe" | "valid" | "invalid";
    text: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    dataTestId?: string;
}) => {
    const dti = makeDTI('codeblock', dataTestId);
    return (
        <div
            data-test-id={dti()}
            className={borderCVA({
                status,
                className: "rounded-t-lg",
            })}
        >
            <CodeEditor
                value={text}
                language="json"
                placeholder="Enter your JSON here"
                onChange={onChange}
                padding={15}
                style={{
                    fontSize: 16,
                }}
            />
        </div>
    )
};

export default CodeBlock;
