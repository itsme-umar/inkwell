import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      )}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="42yqmns3va6cxupl951wtqp4itt0a3n19iy5jmlbzli3653h"
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 400,
              menubar: true,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime',
                'media', 'table', 'help', 'wordcount',
              ],
              toolbar:
                'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | removeformat | help',
              content_style:
                'body { font-family: Source Sans 3, system-ui, sans-serif; font-size: 16px; line-height: 1.6; }',
              skin: 'oxide',
              content_css: 'default',
            }}
          />
        )}
      />
    </div>
  )
}
