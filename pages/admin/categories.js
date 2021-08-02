import React, { useEffect, useState } from 'react';
import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import ButtonSquare from '../../components/ButtonSquare';
import Link from 'next/link';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';
import CategoriesList from '../../components/CategoriesList';
import { useRouter } from 'next/router';



export default function categories() {
    //ROUTER
    const router = useRouter();


    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='categories-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span> Manage Categories</span>
                    </Heading>

                    <ButtonSquare text='Create Category' action={() => router.push('/admin/categorycreate')} />

                    <CategoriesList />
                </div>

            </div>
        </ProtectAdminRoute>
    )
}
