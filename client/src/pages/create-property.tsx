import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { FieldValues } from "react-hook-form";

import Form from "components/common/Form";

const CreateProperty = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [propertyImage, setPropertyImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading }, register, handleSubmit, } = useForm();

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setPropertyImage({ name: file?.name, url: result }),
        );
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!propertyImage.name) return alert("Please select an image");

        await onFinish({
            ...data,
            photo: propertyImage.url,
            email: user.email,
        });
    };

    return (
        <Form
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            propertyImage={propertyImage}
        />
    );
};
export default CreateProperty;

// import Add from "@mui/icons-material/Add";
// import { useTable } from "@refinedev/core";
// import { useState } from "react";
// import { useGetIdentity } from "@refinedev/core/dist/hooks";
// import { FieldValues, useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Form from "components/common/Form";
// import { UseFormReturn } from 'react-hook-form';

// const CreateProperty = () => {
//     const navigate = useNavigate();
//     const { data: user } = useGetIdentity();
//     const [propertyImage, setPropertyImage] = useState({ name: '', url: '' });
//     // const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm();
    
    

//     // Define MyForm interface based on the actual structure of UseFormReturn
//     interface MyForm extends UseFormReturn<FieldValues, any, undefined> {
//       refineCore: {
//         onFinish: () => void;
//         formLoading: boolean;
//       };
//     }
    
//     const { refineCore: { onFinish, formLoading }, register, handleSubmit } = useForm() as MyForm;
    
//     const handleImageChange = (file: File) => {
//         const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
//             const fileReader = new FileReader();
//             fileReader .onload = () => resolve(fileReader.result as string);
//             fileReader.readAsDataURL(readFile);
//         });

//         reader(file).then((result: string) => setPropertyImage({
//             name: file?.name, url: result
//         }));
//     }
//     const onFinishHandler = async (data: FieldValues) => {
//         if(!propertyImage.name) return alert('Please select an image');

//         await onFinish({ ...data, photo: propertyImage.url, email: user.email })
//     }

//     return(
//         <Form 
//             type="Create"
//             register={register}
//             onFinish={onFinish}
//             formLoading={formLoading}
//             handleSubmit={handleSubmit}
//             propertyImage={propertyImage}
//             handleImageChange={handleImageChange}
//             onFinishHandler={onFinishHandler}
//         />
//     )
// }

// export default CreateProperty;