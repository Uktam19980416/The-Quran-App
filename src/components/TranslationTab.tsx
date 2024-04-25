import React from 'react'
import { useSignedContext } from '../contexts/SignedContext'

const TranslationTab: React.FC = () => {
  const { translationData, setTranslatedText, translatedText } =
    useSignedContext()

  return (
    <div className="flex items-center justify-between">
      <p>Translation</p>
      {translationData.length > 0 && (
        <select
          className="select select-bordered w-full max-w-xs"
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
        >
          {/* <option value="">Select Translator</option> */}
          {translationData.map((format) => (
            <option key={format.identifier} value={format.identifier}>
              {format.englishName}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default TranslationTab

// import React, { useState, useEffect } from 'react';

// interface Format {
//   identifier: string;
//   englishName: string;
// }

// const TranslationTab: React.FC = () => {
//   const [textFormats, setTextFormats] = useState<Format[]>([]);
//   const [selectedTextFormat, setSelectedTextFormat] = useState<string>('');

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('https://api.alquran.cloud/v1/edition/type/translation');
//         const data = await response.json();
//         setTextFormats(data.data);
//         setSelectedTextFormat(data.data[0]?.identifier || ''); // Set default value if data is available
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="flex items-center justify-between">
//       <p>Translation</p>
//       {textFormats.length > 0 && (
//         <select
//           className="select select-bordered w-full max-w-xs"
//           value={selectedTextFormat}
//           onChange={(e) => setSelectedTextFormat(e.target.value)}
//         >
//           {textFormats.map((format) => (
//             <option key={format.identifier} value={format.identifier}>
//               {format.englishName}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default TranslationTab;
