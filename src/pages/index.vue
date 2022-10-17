<!-- eslint-disable no-console -->
<script setup>
import vSelect from 'vue-select'
import { addDoc, collection, doc, getDocs, getFirestore, orderBy, query, where, writeBatch } from 'firebase/firestore'
import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()
const db = getFirestore()
const batch = writeBatch(db)
const name = $ref('')
const options = ref([])
const router = useRouter()
const searchTerm = ref('')
const logout = () => {
  authStore.signout()
}

const onSearch = async (search, loading) => {
  if (search.length > 0) {
    loading(true)
    options.value = []
    const q = query(collection(db, 'students'), where('name', '>=', search), where('name', '<', `${search}z`), orderBy('name', 'asc'))
    const snap = await getDocs(q)
    snap.forEach((doc) => {
      const st = doc.data()
      st.id = doc.id
      options.value.push(st)
    },
    )
    loading(false)
  }
}
/*
const saveLkg = async () => {
  lkg.forEach((item) => {
    item.class = '12'
    const docRef = doc(collection(db, 'students'))
    batch.set(docRef, item)
  })
  try {
    await batch.commit()
    console.log('done')
  }
  catch (e) {
    console.log(e)
  }
}
*/
</script>

<template>
  <header>
    <nav class="flex justify-between px-20 py-10 items-center bg-white">
      <h1 class="text-xl text-gray-800 font-bold">
        ABN School
      </h1>
      <div class="flex items-center">
        <div class="flex items-center">
          <v-select label="name" :filterable="false" :options="options" @search="onSearch">
            <template #no-options>
              type to search Students...
            </template>
            <template #option="option">
              <div class="d-center">
                {{ option.name }}
              </div>
            </template>
            <template #selected-option="option">
              <div class="selected d-center">
                {{ option.name }}
              </div>
            </template>
          </v-select>
        </div>
        <ul class="flex items-center space-x-6">
          <li class="font-semibold text-gray-700">
            Home
          </li>
          <li class="font-semibold text-gray-700">
            Articles
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </li>
          <li>
            <button
              class="m-3 text-sm btn"
              @click="authStore.signout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div>
    <div py-4 />

    <div>
      <button
        class="m-3 text-sm btn"
        @click="saveLkg"
      >
        Save
      </button>
    </div>
  </div>
</template>

<route lang="json">
  {
    "meta" : {
      "requireAuth" : true
    }
  }
</route>
