<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            'name' => 'Prabhat Thapa',
            'email' => 'gorebro@gmail.com',
            'password' => bcrypt('secret'),

        ];
        \App\User::create($user);
    }
}
