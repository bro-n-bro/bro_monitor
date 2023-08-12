<template>
    <div class="blocks">
        <div class="row">
            <TokenPrice />


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">APR</div>

                <div class="val">15.3%</div>

                <div class="chart"></div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">Inflation</div>

                <div class="val">24.7%</div>

                <div class="chart"></div>
            </div>


            <MarketCap />


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">APY</div>

                <div class="val">150%</div>

                <div class="chart"></div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">Total amount of unbonded ATOM</div>

                <div class="val">7 320 612</div>

                <div class="chart"></div>
            </div>


            <PendingProposals />

            <ActiveProposals />


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">Total amount of bonded ATOM</div>

                <div class="val">246 379 529</div>

                <div class="chart"></div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>

                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
                    </button>
                </div>

                <div class="title">Total bonded ratio</div>

                <div class="val">70.19%</div>

                <div class="chart"></div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>
                </div>

                <div class="title">Total Supply</div>

                <div class="val">351 021 947</div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>
                </div>

                <div class="title">Cosmos Circulating Supply</div>

                <div class="val">351 022 192</div>
            </div>


            <div class="block">
                <div class="btns">
                    <button class="btn">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                    </button>
                </div>

                <div class="title">Community Pool</div>

                <div class="val">3 500 000</div>
            </div>


            <LastBlockHeight />
        </div>
    </div>
</template>


<script setup>
    // Components
    import TokenPrice from  '@/components/Network/Blocks/TokenPrice.vue'
    import MarketCap from  '@/components/Network/Blocks/MarketCap.vue'
    import PendingProposals from  '@/components/Network/Blocks/PendingProposals.vue'
    import ActiveProposals from  '@/components/Network/Blocks/ActiveProposals.vue'
    import LastBlockHeight from  '@/components/Network/Blocks/LastBlockHeight.vue'
</script>