import { lazy, Suspense, useMemo, useEffect, useState, useRef } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import { useAddTermsMutation, useGetTermsQuery } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";

const LegalSkeleton = lazy(() => import('@/components/legal/LegalSkeleton'));
const JoditEditorLazy = lazy(() => import("jodit-react"));

const Terms = () => {
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { theme } = useTheme();

    const { data: terms, isLoading: termsLoading } = useGetTermsQuery();
    const [addTerms, { isLoading: addTermsLoading }] = useAddTermsMutation();
    useEffect(() => {
        if (!termsLoading && terms?.data?.description !== undefined) {
            setContent(terms.data.description || "");
        }
    }, [terms, termsLoading]);

    const handleSubmit = async () => {
        const res = await addTerms({ description: content });
        if (res?.data?.success) {
            SuccessToast("Terms updated successfully");
        }
    };

    const editorConfig = useMemo(() => {
        let currentTheme = theme;
        if (theme === 'system') {
            currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }

        return {
            readonly: false,
            height: 650,
            toolbarAdaptive: false,
            toolbarSticky: false,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            placeholder: "Write your Terms & Conditions here...",
            theme: currentTheme,
            buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
        };
    }, [theme]);

    const isComponentLoading = termsLoading || !terms; 

    return (
        <Suspense fallback={<LegalSkeleton />}>
            <PageLayout
                pagination={
                    <>
                        {!isComponentLoading && (
                            <Button
                                disabled={addTermsLoading}
                                loading={addTermsLoading} className="w-24 mx-auto mt-4"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        )}
                    </>
                }
            >
                <Title title="Terms" />

                {isComponentLoading ? (
                    <LegalSkeleton />
                ) : (
                    <div className="rounded-lg shadow p-4">
                        <JoditEditorLazy
                            ref={editor}
                            value={content}
                            onBlur={(newContent) => setContent(newContent)}
                            config={editorConfig}
                        />
                    </div>
                )}
            </PageLayout>
        </Suspense>
    );
};

export default Terms;