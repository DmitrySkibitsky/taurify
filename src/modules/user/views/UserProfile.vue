<script setup lang="ts">
  import UserAvatar from '@/modules/user/components/user_profile/UserAvatar.vue';
  import { IUserProfile } from '@/modules/user/services/userProfile.ts';
  import { useUserStore } from '@/modules/user/stores/user.ts';
  import { storeToRefs } from 'pinia';
  import { Ref } from 'vue';
  import TopArtistsCarousel from '@/modules/user/components/user_profile/TopArtistsCarousel.vue';

  const userStore = useUserStore();

  const {
    userProfile,
  }: {
    userProfile: Ref<IUserProfile | null>;
  } = storeToRefs(userStore);
</script>

<template>
  <div class="d-flex justify-space-between align-center flex-wrap ga-4">
    <div class="d-flex align-start align-md-center ga-4">
      <UserAvatar :size="124" />

      <div>
        <div class="d-flex flex-center mb-1">Profile</div>
        <div class="d-flex flex-center mb-1">
          {{ userProfile?.displayName }}
        </div>
        <div
          class="d-flex align-center text-medium-emphasis text-body-2 ga-2 ga-md-8 flex-wrap"
        >
          <div class="d-flex align-center">
            <span class="font-weight-bold me-1">
              {{ userProfile?.followers.total }}
            </span>
            <span class="text-uppercase">Followers</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-10">
    <TopArtistsCarousel />
  </div>
</template>
