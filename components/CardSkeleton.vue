<template>
<v-card>
    <v-flex>
        <card-skeleton-media height="150px" width="150px" v-if="hasMedia">
        </card-skeleton-media>
    </v-flex>
    <card-skeleton-header class="pb-4 pt-4">
    </card-skeleton-header>
    <card-skeleton-actions v-if="hasActions" class="pt-4">
    </card-skeleton-actions>
</v-card>
</template>

<script>
import CardSkeletonHeader from './CardSkeletonHeader/CardSkeletonHeader.vue'
import CardSkeletonMedia from './CardSkeletonMedia/CardSkeletonMedia.vue'
import CardSkeletonText from './CardSkeletonText/CardSkeletonText.vue'
import CardSkeletonActions from './CardSkeletonActions/CardSkeletonActions.vue'

export default {
  name: '',
  props: {
    hasHeader: {
      default: true
    },
    hasMedia: {
      default: true
    },
    hasText: {
      default: true
    },
    hasActions: {
      default: true
    },
    isHorizontal: {
      default: true
    },
    lines: {
      default: 2
    }
  },
  components: {
    CardSkeletonHeader,
    CardSkeletonMedia,
    CardSkeletonText,
    CardSkeletonActions
  },
  data: function () {
    return {}
  },
  methods: {}
}
</script>

<style>
.flex--grow {
  flex-grow: 99 !important;
}
</style>
