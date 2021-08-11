-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "avatar" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mobile" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "brand" VARCHAR(180) NOT NULL,
    "stars" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "mrp" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "fulfilled" BOOLEAN NOT NULL DEFAULT true,
    "deliveryDays" INTEGER NOT NULL DEFAULT 7,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobileDescription" (
    "os" VARCHAR(20) NOT NULL,
    "ram" DOUBLE PRECISION NOT NULL,
    "dimension" DOUBLE PRECISION[],
    "batteryPower" INTEGER NOT NULL,
    "storage" INTEGER NOT NULL,
    "rearCamera" INTEGER NOT NULL,
    "frontCamera" INTEGER NOT NULL,
    "manufacturer" VARCHAR(50) NOT NULL,
    "about" TEXT[],
    "color" VARCHAR(50) NOT NULL,
    "mobileId" UUID NOT NULL,

    PRIMARY KEY ("mobileId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mobileId" UUID NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mobile.name_unique" ON "Mobile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MobileDescription.mobileId_unique" ON "MobileDescription"("mobileId");

-- AddForeignKey
ALTER TABLE "MobileDescription" ADD FOREIGN KEY ("mobileId") REFERENCES "Mobile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD FOREIGN KEY ("mobileId") REFERENCES "Mobile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
