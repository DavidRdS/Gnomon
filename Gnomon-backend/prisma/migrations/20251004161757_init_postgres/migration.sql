-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."locais" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "coordinates" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "iconUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mapas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mapas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."rotas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pathData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rotas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_LocalToRoute" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LocalToRoute_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_passwordResetToken_idx" ON "public"."usuarios"("passwordResetToken");

-- CreateIndex
CREATE INDEX "_LocalToRoute_B_index" ON "public"."_LocalToRoute"("B");

-- AddForeignKey
ALTER TABLE "public"."locais" ADD CONSTRAINT "locais_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "public"."mapas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LocalToRoute" ADD CONSTRAINT "_LocalToRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."locais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_LocalToRoute" ADD CONSTRAINT "_LocalToRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."rotas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
