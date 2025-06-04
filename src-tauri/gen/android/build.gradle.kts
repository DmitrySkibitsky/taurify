buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:8.5.1")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.25")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

tasks.register("clean").configure {
    delete("build")
}

tasks.withType<JavaCompile> {
    options.compilerArgs.add("--enable-preview")
    sourceCompatibility = "21"
    targetCompatibility = "21"
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions {
        jvmTarget = "21"
        freeCompilerArgs += listOf(
            "-Xjvm-default=all",
            "-Xopt-in=kotlin.RequiresOptIn",
            "-Xenable-jvm-preview"
        )
    }
}
