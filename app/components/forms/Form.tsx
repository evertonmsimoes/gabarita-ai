import React, { useState } from "react";
import Image from "next/image";

interface FormProps {
  name: string;
  onSubmit: (formData: { education: string; discipline: string; content: string }) => void;
}

const Form = ({ name, onSubmit }: FormProps) => {
  const [education, setEducation] = useState('Ensino Fundamental');
  const [discipline, setDiscipline] = useState('');
  const [content, setContent] = useState('');

  const [disciplineError, setDisciplineError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: { education: string; discipline: string; content: string } = {
      education,
      discipline,
      content,
    };

    let formIsValid = true;
    if (discipline.trim() === '') {
      setDisciplineError(true);
      formIsValid = false;
    }
    if (content.trim() === '') {
      setContentError(true);
      formIsValid = false;
    }

    if (formIsValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8 w-full">
      <div className="flex flex-col bg-white w-full md:w-2/3 lg:w-1/2 xl:w-max py-6 px-8 rounded-lg gap-4">
        <div className="flex flex-col lg:flex-row gap-8 mb-4 justify-between">
          <div>
            <label htmlFor="education" className="block mb-2 font-medium text-gray-900">Educação</label>
            <select
              id="education"
              name="education"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              value={education}
              onChange={(event) => setEducation(event.target.value)}
            >
              <option value="Ensino Fundamental">Ensino Fundamental</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Ensino Superior">Ensino Superior</option>
            </select>
          </div>
          <div>
            <label htmlFor="discipline" className="block mb-2 font-medium text-gray-900">Matéria</label>
            <input
              id="discipline"
              name="discipline"
              className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                disciplineError ? 'border-red-500' : 'border-gray-300'
              } focus:ring-blue-500 focus:border-blue-500`}
              value={discipline}
              onChange={(event) => {
                setDiscipline(event.target.value);
                setDisciplineError(false);
              }}
              maxLength={30}
            />
            {disciplineError && <p className="mt-1 text-red-500 text-sm">Campo obrigatório</p>}
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="content" className="block mb-2 font-medium text-gray-900">Conteúdo</label>
          <textarea
            id="content"
            name="content"
            rows={3}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              contentError ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500 focus:border-blue-500`}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setContentError(false);
            }}
            maxLength={150}
          />
          {contentError && <p className="mt-1 text-red-500 text-sm">Campo obrigatório</p>}
        </div>
      </div>

      <button
        type="submit"
        className={`${isSubmitting ? "cursor-progress" : "cursor-pointer"} bg-gradient-to-tr from-[#39B7A8] to-[#2A8278] hover:from-[#2A8278] hover:to-[#1D5B54] px-5 py-3 text-white font-semibold rounded-lg`}
        disabled={isSubmitting}
      >
        {
          isSubmitting ? (
            <div className="flex justify-center items-center gap-2">
              <Image
                src={"/loading.svg"}
                alt="Loading spin"
                width={0}
                height={0}
                className="w-4 h-auto animate-spin"
              />
              Gerando...
            </div>
          ) : (
            `Gerar ${name}`
          )
        }
      </button>
    </form>
  );
}

export default Form;
