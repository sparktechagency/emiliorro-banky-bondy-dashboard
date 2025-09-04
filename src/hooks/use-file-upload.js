import { useCallback, useMemo, useRef, useState, useEffect } from 'react';

// Simple, single-file uploader hook with drag & drop, preview, and validation
// API inspired by the example provided by the user.
export function useFileUpload(options = {}) {
  const { accept = '*', maxSize = Infinity } = options;

  const inputRef = useRef(null);
  const [files, setFiles] = useState([]); // [{ id, file, preview }]
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState([]); // [string]

  // Helpers
  const revokeAllPreviews = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
      return prev;
    });
  }, []);

  useEffect(() => {
    return () => revokeAllPreviews();
  }, [revokeAllPreviews]);

  const validateFile = useCallback(
    (file) => {
      const errs = [];
      if (!file) {
        errs.push('No file provided.');
        return errs;
      }
      // Size check
      if (file.size > maxSize) {
        errs.push(`File is too large. Max size is ${(maxSize / (1024 * 1024)).toFixed(0)}MB.`);
      }
      // Type check (basic)
      if (accept && accept !== '*' && accept.length > 0) {
        const acceptList = accept.split(',').map((s) => s.trim());
        const isAccepted = acceptList.some((rule) => {
          if (rule.endsWith('/*')) {
            const prefix = rule.slice(0, rule.indexOf('/'));
            return file.type.startsWith(prefix + '/');
          }
          return file.type === rule || file.name?.toLowerCase().endsWith(rule.toLowerCase());
        });
        if (!isAccepted) {
          errs.push('File type not accepted.');
        }
      }
      return errs;
    },
    [accept, maxSize]
  );

  const setSingleFile = useCallback(
    (file) => {
      revokeAllPreviews();
      if (!file) {
        setFiles([]);
        return;
      }
      const preview = URL.createObjectURL(file);
      const wrapped = { id: `${file.name}-${file.size}-${file.lastModified}-${Date.now()}`, file, preview };
      setFiles([wrapped]);
    },
    [revokeAllPreviews]
  );

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList && fileList[0];
      const errs = validateFile(file);
      if (errs.length) {
        setErrors(errs);
        return;
      }
      setErrors([]);
      setSingleFile(file);
    },
    [setSingleFile, validateFile]
  );

  const handleSelect = useCallback(
    (e) => {
      const fl = e.target.files;
      handleFiles(fl);
      // Reset the input so selecting the same file again still triggers change
      e.target.value = '';
    },
    [handleFiles]
  );

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const fl = e.dataTransfer?.files;
      handleFiles(fl);
    },
    [handleFiles]
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      return [];
    });
    setErrors([]);
  }, []);

  const getInputProps = useCallback(
    () => ({
      type: 'file',
      accept,
      onChange: handleSelect,
      ref: inputRef,
    }),
    [accept, handleSelect]
  );

  const state = useMemo(() => ({ files, isDragging, errors }), [files, isDragging, errors]);
  const actions = useMemo(
    () => ({ handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps }),
    [handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps]
  );

  return [state, actions];
}
