<template>
    <v-container>
        <v-row>
            <v-col :cols="12">
                <h2>Администратор</h2>
            </v-col>
            <v-col :cols="12" class="d-flex">
                <NuxtLink to="create-rest" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-table-chair" size="x-large" />
                        <div class="explanation text-center">создать <br> ресторан</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="create-hall" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-table-picnic" size="x-large" />
                        <div class="explanation text-center">создать <br> зал</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-truck-fast-outline" size="x-large"/>
                        <div class="explanation text-center">управлять <br> категориями</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-truck-fast-outline" size="x-large"  />
                        <div class="explanation text-center">создать <br> менеджера</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-truck-fast-outline" size="x-large" />
                        <div class="explanation text-center">заказы</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/" class="d-flex">
                    <div class="d-flex flex-column align-center pa-4">
                        <v-icon icon="mdi-truck-fast-outline" size="x-large" />
                        <div class="explanation text-center">спрятать <br> ресторан</div>
                    </div>
                </NuxtLink>
            </v-col>
            <v-col :cols="12">
                <NuxtPage />
            </v-col>
        </v-row>
        <v-row>
            <v-col :cols="12">
                Что делает адмитстратор:
                <ul>
                    <li>Создает ресторан</li>
                    <li>Создает зал в ресторане для возможности бронирования </li>
                    <li>Наделяет пользователя правами менеджера, администратора</li>
                    <li>Создает категории </li>
                    <li>Просматирвает все заказ получаемые через приложение</li>
                    <li>Блокирует/закрывает ресторан</li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>