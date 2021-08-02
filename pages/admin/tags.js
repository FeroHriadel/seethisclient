import React, { useEffect, useState } from 'react';
import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import ButtonSquare from '../../components/ButtonSquare';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';
import TagsList from '../../components/TagsList';
import { useRouter } from 'next/router';



export default function Tags() {
    //ROUTER
    const router = useRouter();

    

    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='tags-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span> Manage Tags</span>
                    </Heading>

                    <ButtonSquare text='Create Tag' action={() => router.push('/admin/tagcreate')} />

                    <TagsList />
                </div>

            </div>
        </ProtectAdminRoute>
    )
}
