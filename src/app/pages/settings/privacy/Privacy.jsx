import { lazy, Suspense, useMemo, useEffect, useState, useRef } from "react";
import Title from "@/components/ui/Title";
import PageLayout from "@/components/main-layout/PageLayout";
import { useAddPrivacyPolicyMutation, useGetPrivacyPolicyQuery } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/theme-provider";
const LegalSkeleton = lazy(() => import('@/components/legal/LegalSkeleton'));
const JoditEditorLazy = lazy(() => import("jodit-react"));

const Privacy = () => {
    const [content, setContent] = useState("");
    const editor = useRef(null);
    const { theme } = useTheme();

    const { data: privacyPolicy, isLoading: privacyPolicyLoading } = useGetPrivacyPolicyQuery();
    const [addPrivacyPolicy, { isLoading: addPrivacyPolicyLoading }] = useAddPrivacyPolicyMutation();
    useEffect(() => {
        if (!privacyPolicyLoading && privacyPolicy?.data?.description !== undefined) {
            setContent(privacyPolicy.data.description || "");
        }
    }, [privacyPolicy, privacyPolicyLoading]);

    const handleSubmit = async () => {
        const res = await addPrivacyPolicy({ description: content });
        if (res?.data?.success) {
            SuccessToast("Privacy Policy updated successfully");
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
            placeholder: "Write your Privacy Policy here...",
            theme: currentTheme,
            buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'link', 'table', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'],
        };
    }, [theme]);
    
    const isComponentLoading = privacyPolicyLoading || !privacyPolicy; 

    return (
        <Suspense fallback={<LegalSkeleton />}>
            <PageLayout
                pagination={
                    <>
                        {!isComponentLoading && (
                            <Button
                                disabled={addPrivacyPolicyLoading}
                                loading={addPrivacyPolicyLoading} className="w-24 mx-auto mt-4"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        )}
                    </>
                }
            >
                <Title title="Privacy Policy" />

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

export default Privacy;