"use client"

import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/app/dashboard/components/button';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


interface CategoryProps {
    id: string;
    nome: string;
}

interface Props {
    categories: CategoryProps[]
}

export function Form({ categories }: Props) {
    const router = useRouter();
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegisterProduct(formData: FormData) {
        const categoryIndex = formData.get("category");
        const name = formData.get("nome");
        const price = formData.get("price");
        const description = formData.get("description");

        if (!name || !categoryIndex || !price || !description || !image) {
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData();

        data.append("nome", name);
        data.append("price", price);
        data.append("description", description);
        data.append("category_id", categories[Number(categoryIndex)].id);
        data.append("images[]", image);

        const token = await getCookieClient();

        await api.post("produtos", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log(err);
                toast.warning("Falha ao cadastrar esse produto!");
                return;
            })

        toast.success("Produto registrado com sucesso!");
        router.push("/dashboard");
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato não permitido!")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }


    return (
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color='#FFF' />
                    </span>
                    <input
                        type="file"
                        name="images[]"
                        accept="image/png, image/jpeg"
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem de preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                        />
                    )}

                </label>

                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}>
                            {category.nome}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="nome"
                    placeholder="Digite o nome do produto"
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Digite o preço do produto"
                    required
                    className={styles.input}
                />

                <textarea
                    name="description"
                    className={styles.input}
                    placeholder="Descrição do produto"
                    required
                ></textarea>
                <Button name="Cadastrar produto" />
            </form>
        </main>
    )
}